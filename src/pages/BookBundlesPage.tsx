
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookBundle from '@/components/product/BookBundle';
import { getProductById } from '@/data/productService';

// Sample bundles data - in a real app, this would come from an API or database
const bundles = [
  {
    id: "1",
    title: "Summer Reading Collection",
    description: "Perfect beach reads for your summer vacation",
    productIds: ["1", "3", "5"],
    discountPercentage: 15
  },
  {
    id: "2",
    title: "Personal Development Bundle",
    description: "Enhance your skills with this curated collection",
    productIds: ["2", "6", "8"],
    discountPercentage: 20
  },
  {
    id: "3",
    title: "Sci-Fi Lovers Bundle",
    description: "Journey through space and time with these sci-fi classics",
    productIds: ["4", "7", "9"],
    discountPercentage: 15
  }
];

const BookBundlesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Book Bundles & Collections</h1>
            <p className="text-muted-foreground">
              Save more with our specially curated book bundles. Each bundle comes with a special discount!
            </p>
          </div>
          
          <div className="space-y-8">
            {bundles.map(bundle => {
              const products = bundle.productIds
                .map(id => getProductById(id))
                .filter(product => product !== undefined);
                
              if (products.length === 0) return null;
              
              return (
                <BookBundle
                  key={bundle.id}
                  title={bundle.title}
                  description={bundle.description}
                  products={products}
                  discountPercentage={bundle.discountPercentage}
                />
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookBundlesPage;
