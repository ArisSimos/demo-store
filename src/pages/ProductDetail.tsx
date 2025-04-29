
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProductById, getCategoryById, getProductsByCategory } from '@/data/products';

// Import smaller components
import ProductBreadcrumb from '@/components/product/ProductBreadcrumb';
import BackButton from '@/components/product/BackButton';
import ProductImageContainer from '@/components/product/ProductImageContainer';
import ProductInfo from '@/components/product/ProductInfo';
import ProductDetails from '@/components/product/ProductDetails';
import ProductActions from '@/components/product/ProductActions';
import RelatedProducts from '@/components/product/RelatedProducts';
import ProductNotFound from '@/components/product/ProductNotFound';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  
  if (!product) {
    return <ProductNotFound />;
  }
  
  const category = getCategoryById(product.category);
  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <ProductBreadcrumb category={category} productName={product.name} />
          
          {/* Back button for mobile */}
          <BackButton />
          
          {/* Product details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Product image */}
            <ProductImageContainer src={product.image} alt={product.name} />
            
            {/* Product info */}
            <div>
              <ProductInfo product={product} category={category} />
              <ProductDetails product={product} />
              <ProductActions product={product} />
            </div>
          </div>
          
          {/* Related products */}
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
