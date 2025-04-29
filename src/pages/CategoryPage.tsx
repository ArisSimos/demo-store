
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory, getCategoryById } from '@/data/products';
import { Button } from '@/components/ui/button';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const allCategories = ['electronics', 'clothing', 'home', 'books'];
  const category = getCategoryById(slug || '');
  const products = getProductsByCategory(slug || '');
  
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-16 flex-grow flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">{category.name}</h1>
            <nav className="mt-2">
              <ol className="flex items-center text-sm">
                <li>
                  <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
                </li>
                <li className="mx-2 text-gray-400">/</li>
                <li className="text-gray-700 font-medium">{category.name}</li>
              </ol>
            </nav>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="font-semibold text-lg mb-4">Categories</h2>
                <ul className="space-y-2">
                  {allCategories.map((cat) => {
                    const catObj = getCategoryById(cat);
                    if (!catObj) return null;
                    
                    return (
                      <li key={cat}>
                        <Link 
                          to={`/category/${catObj.slug}`}
                          className={`block py-1 ${cat === slug ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
                        >
                          {catObj.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                
                <div className="mt-8">
                  <h2 className="font-semibold text-lg mb-4">Price Range</h2>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary mr-2" />
                      <span className="text-gray-600">Under $50</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary mr-2" />
                      <span className="text-gray-600">$50 - $100</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary mr-2" />
                      <span className="text-gray-600">$100 - $200</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary mr-2" />
                      <span className="text-gray-600">Over $200</span>
                    </label>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h2 className="font-semibold text-lg mb-4">Availability</h2>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary mr-2" />
                      <span className="text-gray-600">In Stock</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary mr-2" />
                      <span className="text-gray-600">On Sale</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-3">
              {/* Filters and sorting */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <p className="text-gray-600 mb-3 sm:mb-0">
                  Showing <span className="font-medium">{products.length}</span> products
                </p>
                <select className="border rounded-md px-3 py-1.5 bg-white">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>
              
              {/* Products grid */}
              {products.length > 0 ? (
                <div className="product-grid">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any products in this category.
                  </p>
                  <Button asChild>
                    <Link to="/">Continue Shopping</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
