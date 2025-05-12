
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
import { Card, CardContent } from '@/components/ui/card';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  
  if (!product) {
    return <ProductNotFound />;
  }
  
  const category = getCategoryById(product.category);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-6 pb-12">
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
              </Card>
            </div>
          </div>
          
          <div className="my-12 bg-amber-50/50 p-6 rounded-lg border border-amber-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 library-heading text-amber-900">Synopsis</h2>
            <div className="prose max-w-none text-amber-950 leading-relaxed">
              <p>{product.description}</p>
            </div>
            <div className="mt-8">
              <ProductDetails product={product} />
            </div>
          </div>
          
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
