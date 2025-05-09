
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { BookmarkX } from 'lucide-react';

const WishlistPage = () => {
  const { wishlistItems, clearWishlist } = useWishlist();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            {wishlistItems.length > 0 && (
              <Button 
                variant="outline" 
                onClick={clearWishlist}
                className="flex items-center"
              >
                <BookmarkX className="mr-2 h-4 w-4" />
                Clear Wishlist
              </Button>
            )}
          </div>
          
          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistItems.map(product => (
                <ProductCard key={product.id} product={product} showWishlistButton={false} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-xl mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8">Browse our collection and add books you're interested in!</p>
              <Button asChild>
                <a href="/category/all">Browse Books</a>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WishlistPage;
