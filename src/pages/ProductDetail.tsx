
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, Heart, Share2, ShoppingCart, ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProductById, getCategoryById } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory } from '@/data/products';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const product = getProductById(id || '');
  
  if (!product) {
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
  }
  
  const category = getCategoryById(product.category);
  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center text-sm">
              <li>
                <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
              </li>
              <li className="mx-2 text-gray-400">/</li>
              <li>
                <Link to={`/category/${category?.slug}`} className="text-gray-500 hover:text-primary">
                  {category?.name}
                </Link>
              </li>
              <li className="mx-2 text-gray-400">/</li>
              <li className="text-gray-700 font-medium truncate max-w-[200px]">{product.name}</li>
            </ol>
          </nav>
          
          {/* Back button for mobile */}
          <Button
            variant="ghost" 
            size="sm"
            asChild
            className="mb-4 md:hidden"
          >
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Books
            </Link>
          </Button>
          
          {/* Product details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Product image */}
            <div className="bg-white rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover object-center"
              />
            </div>
            
            {/* Product info */}
            <div>
              <div className="mb-6">
                {category && (
                  <span className="category-badge mb-2">
                    {category.name}
                  </span>
                )}
                {product.format === 'audiobook' && (
                  <span className="ml-2 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-bold inline-flex items-center">
                    <BookOpen size={12} className="mr-1" />
                    AUDIOBOOK
                  </span>
                )}
                <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
                {product.author && (
                  <p className="text-lg text-muted-foreground mt-1">by {product.author}</p>
                )}
                <div className="flex items-baseline mt-4">
                  {product.salePrice ? (
                    <>
                      <span className="text-3xl font-bold mr-2">${product.salePrice.toFixed(2)}</span>
                      <span className="price-sale text-lg">${product.price.toFixed(2)}</span>
                      <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded">
                        {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                  )}
                </div>
              </div>
              
              {/* Book details */}
              <div className="mb-6 grid grid-cols-2 gap-4">
                {product.publisher && (
                  <div>
                    <span className="text-sm text-muted-foreground">Publisher:</span>
                    <p>{product.publisher}</p>
                  </div>
                )}
                {product.publicationDate && (
                  <div>
                    <span className="text-sm text-muted-foreground">Publication Date:</span>
                    <p>{product.publicationDate}</p>
                  </div>
                )}
                {product.isbn && (
                  <div>
                    <span className="text-sm text-muted-foreground">ISBN:</span>
                    <p>{product.isbn}</p>
                  </div>
                )}
                {product.pages && (
                  <div>
                    <span className="text-sm text-muted-foreground">Pages:</span>
                    <p>{product.pages}</p>
                  </div>
                )}
                {product.format && (
                  <div>
                    <span className="text-sm text-muted-foreground">Format:</span>
                    <p className="capitalize">{product.format}</p>
                  </div>
                )}
                {product.duration && (
                  <div>
                    <span className="text-sm text-muted-foreground">Duration:</span>
                    <p>{product.duration}</p>
                  </div>
                )}
                {product.narrator && (
                  <div>
                    <span className="text-sm text-muted-foreground">Narrator:</span>
                    <p>{product.narrator}</p>
                  </div>
                )}
              </div>
              
              {/* Status */}
              <div className="mb-6">
                <p className="flex items-center">
                  <span className="mr-2">Status:</span>
                  {product.inStock ? (
                    <span className="text-green-600 font-medium">In Stock</span>
                  ) : (
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  )}
                </p>
              </div>
              
              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
              
              {/* Quantity selector */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Quantity</h3>
                <div className="flex items-center">
                  <button 
                    className="w-10 h-10 flex items-center justify-center rounded-l border border-r-0"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-14 h-10 flex items-center justify-center border text-center">
                    {quantity}
                  </span>
                  <button 
                    className="w-10 h-10 flex items-center justify-center rounded-r border border-l-0"
                    onClick={incrementQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="flex-1"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="mr-2 h-5 w-5" />
                  Wishlist
                </Button>
                <Button variant="outline" size="icon" className="sm:flex-initial">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Related products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Related Books</h2>
              <div className="product-grid">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
