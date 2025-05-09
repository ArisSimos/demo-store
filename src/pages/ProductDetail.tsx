
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
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-4">
            <BackButton />
            <ProductBreadcrumb 
              category={category?.name || ''} 
              categorySlug={category?.slug || ''} 
              productName={product.name} 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <ProductImageContainer image={product.image} name={product.name} />
            
            <div>
              <ProductInfo product={product} />
              <ProductActions product={product} />
            </div>
          </div>
          
          <div className="my-12">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          </div>
          
          <ProductReviews productId={product.id} />
          
          <RecommendedBooks 
            currentProductId={product.id} 
            category={product.category}
            author={product.author}
            title="You May Also Like"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
