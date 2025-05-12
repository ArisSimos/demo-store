
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/product/BackButton';
import ProductImageContainer from '@/components/product/ProductImageContainer';
import ProductInfo from '@/components/product/ProductInfo';
import ProductActions from '@/components/product/ProductActions';
import ProductBreadcrumb from '@/components/product/ProductBreadcrumb';
import ProductNotFound from '@/components/product/ProductNotFound';
import ProductReviews from '@/components/product/ProductReviews';
import RelatedProducts from '@/components/product/RelatedProducts';
import { getProductById, getCategoryById } from '@/data/productService';
import RecommendedBooks from '@/components/RecommendedBooks';
import ProductDetails from '@/components/product/ProductDetails';
import ReadingProgress from '@/components/book/ReadingProgress';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, MessageCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const { isAuthenticated } = useAuth();
  
  if (!product) {
    return <ProductNotFound />;
  }
  
  const category = getCategoryById(product.category);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-6 pb-12 bg-amber-50/30">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <BackButton />
            <ProductBreadcrumb 
              category={category}
              productName={product.name} 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <ProductImageContainer src={product.image} alt={product.name} />
            
            <div>
              <Card className="p-6 book-detail-card">
                <ProductInfo product={product} category={category} />
                <ProductActions product={product} />
                
                {/* Reading Progress (only show for logged in users and if the book has pages) */}
                {isAuthenticated && product.pages && (
                  <div className="mt-6 pt-6 border-t border-amber-200">
                    <ReadingProgress bookId={product.id} totalPages={product.pages} />
                  </div>
                )}
              </Card>
            </div>
          </div>
          
          <Tabs defaultValue="synopsis" className="my-12">
            <TabsList className="w-full border-b border-amber-200 bg-transparent p-0">
              <TabsTrigger 
                value="synopsis"
                className="rounded-t-lg bg-amber-100 data-[state=active]:bg-amber-50 data-[state=active]:border-amber-200 data-[state=active]:border-b-0 data-[state=active]:border-x data-[state=active]:border-t"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Synopsis
              </TabsTrigger>
              <TabsTrigger 
                value="discussions"
                className="rounded-t-lg bg-amber-100 data-[state=active]:bg-amber-50 data-[state=active]:border-amber-200 data-[state=active]:border-b-0 data-[state=active]:border-x data-[state=active]:border-t"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Book Club Discussions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="synopsis" className="p-6 bg-amber-50 border border-amber-200 border-t-0 rounded-b-lg">
              <h2 className="text-2xl font-bold mb-4 library-heading text-amber-900">Synopsis</h2>
              <div className="prose max-w-none text-amber-950 leading-relaxed">
                <p>{product.description}</p>
              </div>
              <div className="mt-8">
                <ProductDetails product={product} />
              </div>
            </TabsContent>
            
            <TabsContent value="discussions" className="p-6 bg-amber-50 border border-amber-200 border-t-0 rounded-b-lg">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 library-heading text-amber-900">Book Club Discussions</h2>
                <p className="text-amber-800">Join the conversation about {product.name}</p>
              </div>
              
              {isAuthenticated ? (
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-lg border border-amber-200">
                    <h3 className="font-medium mb-2">Mystery Lovers Club is reading this book!</h3>
                    <p className="text-sm text-amber-700 mb-4">Join the club to participate in discussions about this book.</p>
                    <a href="/book-clubs" className="text-amber-600 hover:text-amber-800 text-sm font-medium">
                      Visit Book Clubs →
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-6 text-center rounded-lg border border-amber-200">
                  <h3 className="text-lg font-medium mb-2">Sign in to join book discussions</h3>
                  <p className="text-sm text-amber-700 mb-4">Connect with other readers and share your thoughts about this book.</p>
                  <a href="/login" className="text-amber-600 hover:text-amber-800 font-medium">
                    Sign in to continue →
                  </a>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="bookshelf py-8">
            <ProductReviews productId={product.id} />
          </div>
          
          <div className="mt-16 pt-8 border-t border-amber-200">
            <h2 className="text-2xl font-bold mb-8 library-heading text-amber-900">From Our Collection</h2>
            <RecommendedBooks 
              currentProductId={product.id} 
              category={product.category}
              author={product.author}
              title="You May Also Enjoy"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
