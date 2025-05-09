
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory, getCategoryById, getAllProducts } from '@/data/productService';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const category = slug !== 'all' 
    ? getCategoryById(slug || '')
    : { id: 'all', name: 'All Products', slug: 'all' };
  
  const products = slug === 'all'
    ? getAllProducts()
    : getProductsByCategory(slug || '');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">{category?.name || 'Category Not Found'}</h1>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl mb-2">No products found in this category</h2>
              <p className="text-muted-foreground">Please check back later or browse another category</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
