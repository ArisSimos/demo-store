
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
import { BookOpen, Library, BookText } from 'lucide-react';

const Index: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 py-16 border-b border-amber-200">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-amber-900">
                Welcome to Our Digital Library
              </h1>
              <p className="text-amber-800 mb-8 text-lg">
                Discover our vast collection of literary treasures, from classic novels to contemporary masterpieces.
              </p>
              <div className="flex space-x-4">
                <Button asChild size="lg" className="bg-amber-800 hover:bg-amber-900">
                  <Link to="/category/all" className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    <span>Browse Collection</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg" className="border-amber-800 text-amber-800 hover:bg-amber-100">
                  <Link to="/reading-lists" className="flex items-center gap-2">
                    <BookText className="w-5 h-5" />
                    <span>Reading Lists</span>
                  </Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 relative">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-100 rounded-full opacity-50"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-amber-200 rounded-full opacity-40"></div>
              
              {featuredProducts.slice(0, 4).map((product, index) => (
                <Link 
                  key={product.id} 
                  to={`/product/${product.id}`} 
                  className={`block rounded-lg overflow-hidden ${index === 0 ? 'row-span-2' : ''} hover-book relative z-10`}
                >
                  <div className="book-cover transform origin-left transition-transform duration-300">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Featured Products */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-serif font-bold mb-8 library-heading text-amber-900 flex items-center gap-2">
            <Library className="w-6 h-6" />
            <span>Featured Literary Works</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="border-amber-800 text-amber-800 hover:bg-amber-100">
              <Link to="/category/all">View All Books</Link>
            </Button>
          </div>
        </div>
        
        {/* Categories */}
        <div className="bookshelf py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold mb-8 library-heading text-amber-900">Browse by Genre</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map(category => (
                <Link 
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="bg-white/80 rounded-lg p-6 text-center hover:shadow-md transition-shadow border border-amber-100 hover:border-amber-300"
                >
                  <h3 className="font-serif font-medium text-amber-800">{category.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Recommendations */}
        <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-transparent to-amber-50/30">
          <h2 className="text-3xl font-serif font-bold mb-8 library-heading text-amber-900">Librarian's Recommendations</h2>
          <RecommendedBooks title="Selected For You" limit={4} />
        </div>
        
        {/* Newsletter Section */}
        <div className="bg-amber-50 border-t border-amber-100">
          <Newsletter />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
