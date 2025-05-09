
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBox from '@/components/search/SearchBox';
import SearchFilters from '@/components/search/SearchFilters';
import ProductCard from '@/components/ProductCard';
import { getAllProducts, getAllCategories } from '@/data/productService';
import { Product } from '@/types';
import RecommendedBooks from '@/components/RecommendedBooks';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';

  // Search state
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  
  // Filter states
  const allCategories = getAllCategories().map(c => c.name);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const allProducts = getAllProducts();
  const prices = allProducts.map(p => p.salePrice || p.price);
  const minPrice = Math.floor(Math.min(...prices));
  const maxPrice = Math.ceil(Math.max(...prices));
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  
  const allFormats = [...new Set(allProducts.map(p => p.format).filter(Boolean))];
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);

  // Update URL when search changes
  const updateSearchParams = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    navigate({ search: params.toString() });
  };

  // Handle search
  const handleSearch = () => {
    updateSearchParams();
    performSearch();
  };

  // Category filter toggle
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Format filter toggle
  const handleFormatChange = (format: string) => {
    setSelectedFormats(prev => 
      prev.includes(format)
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([minPrice, maxPrice]);
    setSelectedFormats([]);
  };

  // Perform search with filters
  const performSearch = () => {
    const query = searchTerm.toLowerCase();
    
    let results = getAllProducts().filter(product => {
      // Search term matching
      const matchesSearch = !query || 
        product.name.toLowerCase().includes(query) || 
        (product.author && product.author.toLowerCase().includes(query)) || 
        product.description.toLowerCase().includes(query);
      
      // Category filtering
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.some(cat => {
          const categoryObj = getAllCategories().find(c => c.name === cat);
          return categoryObj && product.category === categoryObj.id;
        });
      
      // Price filtering
      const price = product.salePrice || product.price;
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      
      // Format filtering
      const matchesFormat = selectedFormats.length === 0 || 
        (product.format && selectedFormats.includes(product.format));
      
      return matchesSearch && matchesCategory && matchesPrice && matchesFormat;
    });
    
    setSearchResults(results);
  };

  // Initial search on mount and when filters change
  useEffect(() => {
    performSearch();
  }, [searchTerm, selectedCategories, priceRange, selectedFormats]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl font-bold mb-6">Search Our Collection</h1>
              <SearchBox 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onSearch={handleSearch}
                placeholder="Search by title, author, or keyword..."
              />
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters sidebar */}
            <div className="lg:col-span-1">
              <SearchFilters 
                categories={allCategories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                priceRange={[minPrice, maxPrice]}
                selectedPriceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                formats={allFormats as string[]}
                selectedFormats={selectedFormats}
                onFormatChange={handleFormatChange}
                onResetFilters={resetFilters}
              />
            </div>
            
            {/* Results */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  {searchResults.length} Results {searchTerm && `for "${searchTerm}"`}
                </h2>
                {searchTerm && <p className="text-muted-foreground">Showing all books matching your search</p>}
              </div>
              
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No books found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
                  <Button onClick={resetFilters}>Reset Filters</Button>
                </div>
              )}
            </div>
          </div>
          
          {searchResults.length === 0 && (
            <div className="mt-12">
              <RecommendedBooks title="Popular Books You Might Like" limit={8} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
