
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { getFeaturedProducts } from '@/data/productService';
import { categories } from '@/data/products';
import Newsletter from '@/components/Newsletter';
import RecommendedBooks from '@/components/RecommendedBooks';

const Index: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-muted py-16">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Discover Your Next Favorite Book
              </h1>
              <p className="text-muted-foreground mb-8 text-lg">
                Explore our curated collection of bestsellers, new releases, and timeless classics.
              </p>
              <div className="flex space-x-4">
                <Button asChild size="lg">
                  <Link to="/category/all">Shop Now</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link to="/reading-lists">View Reading Lists</Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {featuredProducts.slice(0, 4).map((product, index) => (
                <Link 
                  key={product.id} 
                  to={`/product/${product.id}`} 
                  className={`block aspect-[3/4] rounded-lg overflow-hidden ${index === 0 ? 'row-span-2' : ''}`}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Featured Products */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">Featured Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link to="/category/all">View All Books</Link>
            </Button>
          </div>
        </div>
        
        {/* Categories */}
        <div className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map(category => (
                <Link 
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="bg-background rounded-lg p-6 text-center hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium">{category.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Recommendations */}
        <div className="container mx-auto px-4 py-16">
          <RecommendedBooks title="Recommended for You" limit={4} />
        </div>
        
        {/* Newsletter Section */}
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
