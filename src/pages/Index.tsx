
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  getFeaturedProducts,
  getAllProducts,
  getAllCategories
} from "@/data/productService";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const featuredProducts = getFeaturedProducts();
  const allProducts = getAllProducts();
  const categories = getAllCategories();
  
  const filteredProducts = searchQuery 
    ? allProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.author && product.author.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];
    
  const showSearchResults = searchQuery.length > 0;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/90 to-primary py-20 px-4 mb-12">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome to BookHaven
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover your next favorite book at incredible prices
            </p>
            
            <div className="relative max-w-md mx-auto">
              <Input
                placeholder="Search for books or authors..."
                className="pl-10 pr-4 py-3 w-full text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            
            {showSearchResults && (
              <div className="relative max-w-md mx-auto mt-2 bg-white shadow-lg rounded-lg overflow-hidden z-10">
                <div className="max-h-60 overflow-y-auto p-2">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                      <Link 
                        key={product.id} 
                        to={`/product/${product.id}`}
                        className="flex items-center p-2 hover:bg-gray-100 rounded-md"
                      >
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-10 h-14 object-cover rounded mr-3"
                        />
                        <div>
                          <p className="font-medium line-clamp-1">{product.name}</p>
                          {product.author && (
                            <p className="text-sm text-gray-600">by {product.author}</p>
                          )}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="p-3 text-gray-500">No results found</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="container mx-auto px-4 mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Books</h2>
            <Button asChild variant="outline">
              <Link to="/category/fiction">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        
        {/* Categories */}
        <section className="container mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <Link 
                key={category.id}
                to={`/category/${category.slug}`}
                className="bg-muted rounded-lg p-6 text-center hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium">{category.name}</h3>
              </Link>
            ))}
          </div>
        </section>
        
        {/* New Arrivals */}
        <section className="container mx-auto px-4 mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <Button asChild variant="outline">
              <Link to="/category/all">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allProducts
              .slice()
              .sort((a, b) => 
                new Date(b.publicationDate || '').getTime() - 
                new Date(a.publicationDate || '').getTime()
              )
              .slice(0, 4)
              .map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </section>
        
        {/* Promos Banner */}
        <section className="bg-primary/10 py-16 mb-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Join Our Book Club</h2>
                <p className="text-lg mb-6">Get exclusive discounts, first access to new releases, and personalized recommendations.</p>
                <Button size="lg">Sign Up Now</Button>
              </div>
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                  alt="Book Club" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
