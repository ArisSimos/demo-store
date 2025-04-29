
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProductNotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-16 flex-grow flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Book Not Found</h1>
        <p className="text-gray-600 mb-6">The book you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default ProductNotFound;
