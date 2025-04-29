
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts, categories } from '@/data/products';

const HeroSection = () => (
  <div className="bg-gradient-to-r from-blue-50 to-indigo-50">
    <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center">
      <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Shop Smart, Shop <span className="text-primary">EShopify</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover our wide selection of products with the best prices and fast delivery. 
          Your one-stop shop for everything you need.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" asChild>
            <Link to="/products">Shop Now</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
      </div>
      <div className="lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1607082351056-2fcbc91bd535?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3"
          alt="E-commerce shopping"
          className="rounded-lg shadow-xl"
        />
      </div>
    </div>
  </div>
);

const FeaturesSection = () => (
  <div className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Truck className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Free & Fast Shipping</h3>
          <p className="text-gray-600">
            Get free shipping on orders over $50 and guaranteed delivery within 2-3 business days.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
          <p className="text-gray-600">
            Multiple secure payment options with end-to-end encryption for your safety.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <RefreshCw className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
          <p className="text-gray-600">
            Not satisfied with your purchase? Return within 30 days for a full refund.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const CategorySection = () => (
  <div className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Shop by Category</h2>
        <Link to="/products" className="text-primary font-medium flex items-center hover:underline">
          All Categories <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.slug}`}
            className="group relative overflow-hidden rounded-lg h-64"
          >
            {/* Placeholder image based on category */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105"
              style={{
                backgroundImage: `url('${getCategoryImage(category.id)}')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-white text-xl font-bold mb-1">{category.name}</h3>
              <span className="text-white/80 text-sm">Shop Now</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

// Helper function to get category images
const getCategoryImage = (categoryId: string) => {
  switch (categoryId) {
    case 'electronics':
      return 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.0.3';
    case 'clothing':
      return 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.0.3';
    case 'home':
      return 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.0.3';
    case 'books':
      return 'https://images.unsplash.com/photo-1521123845560-14093637aa7d?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.0.3';
    default:
      return 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.0.3';
  }
};

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();
  
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-primary font-medium flex items-center hover:underline">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="product-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

const NewsletterSection = () => (
  <div className="bg-primary py-16">
    <div className="container mx-auto px-4">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-primary-foreground/80 mb-8">
          Get the latest updates on new products and upcoming sales.
        </p>
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 rounded-md text-foreground"
            required
          />
          <Button type="submit" variant="secondary" size="lg">
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  </div>
);

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <CategorySection />
        <FeaturedProducts />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
