
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen } from 'lucide-react';
import { Category } from '@/types';

interface ProductBreadcrumbProps {
  category?: Category;
  productName: string;
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({ category, productName }) => {
  return (
    <nav className="flex text-sm text-amber-800 mb-6 font-serif bg-amber-50/70 py-2 px-4 rounded border-b border-amber-100">
      <ol className="flex items-center space-x-2 flex-wrap">
        <li className="flex items-center">
          <BookOpen className="h-4 w-4 mr-1" />
          <Link to="/" className="hover:text-primary transition-colors">Library Home</Link>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1 text-amber-600" />
          {category ? (
            <Link to={`/category/${category.slug}`} className="hover:text-primary transition-colors">
              {category.name} Section
            </Link>
          ) : (
            <span>General Collection</span>
          )}
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1 text-amber-600" />
          <span className="truncate max-w-[200px] italic font-medium" title={productName}>
            "{productName}"
          </span>
        </li>
      </ol>
    </nav>
  );
};

export default ProductBreadcrumb;
